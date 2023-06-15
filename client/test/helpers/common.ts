import { Interface } from "ethers";
import ERC20ABI from "./ABI.json"

class Common {
    ERC20Interface = new Interface(ERC20ABI)

    decodeTxnData(inputData: string) {
        try {
            return this.ERC20Interface.parseTransaction({ data: inputData })
        } catch (error) {
            // console.log("Error decoding data data ", error)
        }
    }

}

export const common = new Common();