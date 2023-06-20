import { TransactionResponse, WebSocketProvider } from "ethers";
import { common } from "./helpers/common";
import { executeCommand } from "./helpers/command";

const main = () => {
  console.log("process.env.RPC_URL ", process.env.RPC_URL);
  const provider = new WebSocketProvider(process.env.RPC_URL!);
  let pause = false;

  provider.on("pending", async (txHash: string) => {
    console.log("txHash ", txHash);
    const txn: TransactionResponse | null = await provider.getTransaction(
      txHash
    );

    // console.log("txn ", txn)

    if (txn) {
      const decodedData = common.decodeTxnData(txn.data);

      if (decodedData && !pause) {
        pause = true;
        console.log(
          "decodedData ",
          txn.hash,
          decodedData.args,
          txn.to,
          decodedData.name
        );

        const router = txn.to;

        console.log(
          router?.toLowerCase() == "0x10ed43c718714eb63d5aa57b78b54704e256024e",
          decodedData.name.startsWith("swap")
        );

        if (
          router?.toLowerCase() ==
            "0x10ed43c718714eb63d5aa57b78b54704e256024e" &&
          decodedData.name.startsWith("swap")
        ) {
          const tokenIn = decodedData.args.path[0];
          const tokenOut =
            decodedData.args.path[decodedData.args.path.length - 1];
          const txHash = txn.hash;

          console.log("data ", tokenIn, tokenOut, router, txHash);

          process.env.TOKEN_IN = tokenIn;
          process.env.TOKEN_OUT = tokenOut;
          process.env.ROUTER = router;
          process.env.TXN_HASH = txHash;

          console.log("envs ", process.env);

          // run forge test
          executeCommand(`cd ../ && pwd && forge test --mt testPool -vvvvv`);
        }
      }
    }
  });
};

main();
