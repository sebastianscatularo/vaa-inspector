/*export function parseCCTPTransferPayload(
    payloadArray: Buffer
  ): CircleVaaPayload {
    // start vaa payload
    let offset = 0;
    const version = payloadArray.readUint8(offset);
    offset += 1; // 1
    const nativeSourceTokenAddress = payloadArray.subarray(offset, offset + 32);
    offset += 32; // 33
    const amountBuff = payloadArray.subarray(offset, offset + 32);
    offset += 32; // 65
    const fromDomain = payloadArray.readUInt32BE(offset);
    offset += 4; // 69
    const toDomain = payloadArray.readUInt32BE(offset);
    offset += 4; // 73
    const nonce = payloadArray.readBigUint64BE(offset).toString();
    offset += 8; // 81
    const fromAddressBytes = payloadArray.subarray(offset, offset + 32);
    offset += 32; // 113
    const mintRecipientBuff = payloadArray.subarray(offset, offset + 32);
    offset += 32; // 145
  
    offset += 2; // 147 (2 bytes for payload length)
    const payload = payloadArray.subarray(offset);
    // end vaa payload
  
    if (!(fromDomain in CIRCLE_DOMAIN_TO_WORMHOLE_CHAIN)) {
      throw new Error(`Invalid circle source domain: ${fromDomain})`);
    }
  
    if (!(toDomain in CIRCLE_DOMAIN_TO_WORMHOLE_CHAIN)) {
      throw new Error(`Invalid circle target domain: ${toDomain})`);
    }
  
    // cache toChain ID
    const fromChain = CIRCLE_DOMAIN_TO_WORMHOLE_CHAIN[fromDomain];
    const fromAddress = tryUint8ArrayToNative(fromAddressBytes, fromChain);
    const toChain = CIRCLE_DOMAIN_TO_WORMHOLE_CHAIN[toDomain];
    const to = tryUint8ArrayToNative(mintRecipientBuff, toChain);
    const token = tryUint8ArrayToNative(nativeSourceTokenAddress, fromChain);
    const amount = ethers.BigNumber.from(amountBuff);
  
    return {
      version,
      token,
      amount,
      nonce,
      fromDomain,
      fromChain,
      from: fromAddress,
      toDomain,
      toChain,
      nativeSourceTokenAddress,
      to,
      payload,
    };
  }
  
  export function parseCCTPRelayerPayload(
    payloadArray: Buffer,
    toChain: SupportedChainId
  ): CircleRelayerPayload {
    let offset = 0;
  
    // start relayer payload
    const payloadId = payloadArray.readUint8(offset);
    offset += 1; // 148
    const feeAmount = ethers.BigNumber.from(
      payloadArray.subarray(offset, offset + 32)
    );
    offset += 32; // 180
    const toNativeAmount = ethers.BigNumber.from(
      payloadArray.subarray(offset, offset + 32)
    );
    offset += 32; // 212
    const recipientWalletBytes = Uint8Array.from(
      payloadArray.subarray(offset, offset + 32)
    );
    // offset += 32; // 244
    const recipientWallet = tryUint8ArrayToNative(recipientWalletBytes, toChain);
  
    return {
      payloadId,
      feeAmount,
      toNativeAmount,
      recipientWallet,
    };
  }*/