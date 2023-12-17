import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig } from 'wagmi'
import { mainnet, sepolia, bscTestnet } from 'wagmi/chains'
import AppRouter from './AppRouter'
import AntdConfigProvider from './providers/AntdConfigProvider'

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

if (!process.env.WALLETCONNECT_PROJECT_ID) {
  throw new Error("You need to provide WALLETCONNECT_PROJECT_ID")
}
const projectId = process.env.WALLETCONNECT_PROJECT_ID
const chains = [mainnet, sepolia, bscTestnet]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({ wagmiConfig, projectId, chains })



function App() {

  return (
    <>
      <AntdConfigProvider>
        <WagmiConfig config={wagmiConfig}>
          <AppRouter />
        </WagmiConfig>
      </AntdConfigProvider>
    </>
  )
}

export default App
