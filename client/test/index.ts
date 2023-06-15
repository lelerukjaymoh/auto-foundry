import { TransactionResponse, WebSocketProvider } from "ethers";

const main = () => {
    const provider = new WebSocketProvider(process.env.RPC_URL!);

    provider.on("pending", async (txHash: string) => {
        const txn: TransactionResponse | null = await provider.getTransaction(txHash)

        console.log(txn);

    });
}

main();
