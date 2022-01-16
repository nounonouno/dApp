// The goal is to create a context that will hold
// the users profile information or lack thereof
// Its a state machine that'll let us know if user 
// is authenticated or not to then render accordingly.
import { 
    createContext, 
    ReactNode,
    useMemo,
    useState,
    useCallback,
    useContext
} from "react";

import { webClient } from '../../hooks/identity/identity';
import { SelfID } from "@self.id/web";

const Status = [
    "Connected",
    "Attempting",
    "Idle",
    "Error"
]

// export interface NoUnoContextData {
//     address: string | undefined;
//     status: Status
//     did: any;
//     selfId: any;
//     connect: (cacheProvider?: boolean) => Promise<any>;
// }

export const NoUnoContext = createContext(
    undefined
);

const EmptyAddress = "0x0000000000000000000000000000000000000000";

export const NoUnoProvider = ({ 
    children 
}) => { 

    const [status, setStatus] = useState("Idle")
    const [address, setAddress] = useState()
    const [profile, setProfile] = useState({})
    const [localDid, setDid] = useState(null)
    const [selfId, setSelfId] = useState(undefined)
    
    async function connect() {
        setStatus("Attempting")
        const cdata = await webClient()
        const { id, selfId, error, client } = cdata
    
        console.log(cdata,'cdata')
        if (error) {
          console.log('error: ', error)
          return
        }
        setDid(id)
        setSelfId(selfId)
        const data = selfId != undefined 
            ? await selfId.get('basicProfile')
            : undefined
            
        if (data) {
          setProfile(data)
          console.log(data)
        } else {
          setStatus("Error")
        }
        setStatus("Connected")
      }
    
    const logout = useCallback(() => {  
        localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
        localStorage.removeItem("walletconnect");
    
        setAddress(EmptyAddress);
      }, []);

      console.log(profile, address)

    const value = useMemo(
        () => ({
          address,
          status,
          selfId,
          did: localDid,
          profile,
          setProfile,
          connect,
          logout,
        }),
        [status, address, selfId, localDid, profile]
      );

    return (
        <NoUnoContext.Provider value={value}>
            {children}
        </NoUnoContext.Provider>
    )
}

export function useNoUno() {
    const context = useContext(NoUnoContext);
  
    if (context === undefined) {
      throw new Error(`useRari must be used within a RariProvider`);
    }
  
    return context;
  }