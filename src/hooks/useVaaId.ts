export default function useVaaId(vaa: any) {
    const { emitterChain, emitterAddress, sequence} = vaa || {};
    const emitterAddressHex = emitterAddress?.toString("hex");
    const parts = [emitterChain, emitterAddressHex, sequence];
    return vaa ? parts.join("/") : '';
}