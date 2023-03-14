import "server-only";
import { cookies } from "next/headers";
import { SERVERURL } from "./jsUtills";






export default async function getUserSession(){
    const nextCookies = cookies();
    let isAuthenticatedUserSession = nextCookies.has(process.env.ACCESSTOKENKEY as string)
    let session = isAuthenticatedUserSession ? nextCookies.get(process.env.ACCESSTOKENKEY as string) : 
    nextCookies.get("sid")
  
      return await (await fetch(SERVERURL+"/api/session", {
        headers: {
          cookie: `${session?.name}=${session?.value}` 
        } 
      })).json()
  }
  









