export class IHttpRequest {
    header: {
       timestamp: 0,
       customerId:string,
       msisdn: string,
       messageCode: string,
       locale: string
     }
    body: {}
}

export interface IHttpResponse {
    header: {

        timstamp: 0,
        customerId: string,
        msisdn: string,
        messageCode: string,
        responseCode: string,
        responseMessage: string
    },

    body: {}
}

export interface ICardInfo {
    SystemId: string,
    CategoryId: string,
    Name: string,
    Tags : string,  
    Description: number,
    URL : string,
    IconPath: string
}

export interface IApps {
    CategoryId: string,
    Name: string,
    SystemInfos : ICardInfo[]    
}