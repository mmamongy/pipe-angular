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
    DepartmentId: string,
    Name: string,
    Type:string,
    SearchKeyword : string,  
    Description: number,
    URL : string,
    IconPath: string
}

export interface IApps {
    DepartmentId: string,
    Name: string,
    Email: string,
    SystemInfos : ICardInfo[]    
}