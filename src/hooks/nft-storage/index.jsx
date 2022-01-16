import { NFTStorage, File } from 'nft.storage'
import { pack } from 'ipfs-car/pack';

export const useCreateImage = async (image) => {
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGZiNWJhOGI2YWIwNmMyNDNCYWRCMUJhMDY3RDFENUZEYTU0Q2E0ZDUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0MjE5NTIxNzA0MywibmFtZSI6Im5vdW5vbm91bm8ifQ.T1r0xFVICepdCBRbC3zF7SregP3GjTZLr7wNU37epQM'
    const client = new NFTStorage({ token: apiKey })

    console.log(image)
    //@ts-ignore
    const metadata = await client.storeBlob( 
      new File([image], 'pinpie.jpg', { type: 'image/jpg' })
    )

    return metadata
}