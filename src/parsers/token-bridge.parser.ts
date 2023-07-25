/*function parseTokenTransferPayload(payload: Buffer) {
    const payloadType = payload.readUInt8(0);
    if (payloadType != TokenBridgePayload.Transfer &&
        payloadType != TokenBridgePayload.TransferWithPayload) {
        throw new Error("not token bridge transfer VAA");
    }
    const amount = BigInt(new anchor_1.BN(payload.subarray(1, 33)).toString());
    const tokenAddress = payload.subarray(33, 65);
    const tokenChain = payload.readUInt16BE(65);
    const to = payload.subarray(67, 99);
    const toChain = payload.readUInt16BE(99);
    const fee = payloadType == 1
        ? BigInt(new anchor_1.BN(payload.subarray(101, 133)).toString())
        : null;
    const fromAddress = payloadType == 3 ? payload.subarray(101, 133) : null;
    const tokenTransferPayload = payload.subarray(133);
    return {
        payloadType,
        amount,
        tokenAddress,
        tokenChain,
        to,
        toChain,
        fee,
        fromAddress,
        tokenTransferPayload,
    };
}*/