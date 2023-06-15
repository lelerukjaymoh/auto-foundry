import { TransactionResponse, WebSocketProvider } from "ethers";
import { common } from "./helpers/common";
import fs from 'fs';
import { exec } from "child_process";

const main = () => {
    const provider = new WebSocketProvider(process.env.RPC_URL!);
    const _provider = new WebSocketProvider(process.env.RPC_URL!);
    let pause = false;

    provider.on("pending", async (txHash: string) => {
        const txn: TransactionResponse | null = await provider.getTransaction("0xd294821f1c6c0deb8dd23dc9a6ccb6c396c6a3942fe9d6dadac44589da1c84f4")

        // console.log("txn ", txn)

        if (txn) {
            const decodedData = common.decodeTxnData(txn.data)


            if (decodedData && !pause) {
                pause = true;
                console.log("decodedData ", txn.hash, decodedData);
                const tokenIn = decodedData.args.path[0]
                const tokenOut = decodedData.args.path[decodedData.args.path.length - 1]
                const router = decodedData.args.to
                const txHash = txn.hash

                console.log("data ", tokenIn, tokenOut, router, txHash);

                const data = `RPC_URL = "${process.env.JSON_RPC_URL}"
TOKEN_IN = "${tokenIn}"
TOKEN_OUT = "${tokenOut}"
ROUTER = "${router}"
TXN_HASH = ${txHash}`;

                fs.writeFileSync('../.env', data);

                // run forge test 
                exec("cd ../../ && forge test -vvvvv", (error: any, stdout: any, stderr: any) => {
                    if (error) {
                        console.log(`error: ${error}`);
                        return;
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                        return;
                    }
                    console.log(`stdout: ${stdout}`);
                });
            }

        }


    });
}

main();
