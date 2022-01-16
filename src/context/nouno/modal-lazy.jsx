const node = "https://eth-mainnet.alchemyapi.io/v2/I4TZi8QLjwehpJbFplMHTXjNkQVbqwA-";

export async function launchModalLazy(
    cacheProvider = true
  ) {
    const [WalletConnectProvider, Web3Modal] = await Promise.all([
      import("@walletconnect/web3-provider"),
      import("web3modal"),
    ]);
  
    const providerOptions = {
      injected: {
        display: {
          description: "Connect with a browser extension",
        },
        package: null,
      },
      walletconnect: {
        package: WalletConnectProvider.default,
        options: {
          rpc: {
            1: node,
          },
        },
        display: {
          description:"Scan with a wallet to connect",
        },
      },
    };
  
    if (!cacheProvider) {
      localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
      localStorage.removeItem("walletconnect");
    }
  
    const web3Modal = new Web3Modal.default({
      cacheProvider,
      providerOptions,
      theme: {
        background: "#F7F7F7",
        main: "#FFFFFF",
        secondary: "#858585",
        border: "#F7F7F7",
        hover: "#000000",
      },
    });
  
    return web3Modal.connect();
  }