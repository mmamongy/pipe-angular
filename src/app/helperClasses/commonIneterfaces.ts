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
    SystemInfos: string;
    Name: string;
    icon: string;
    Description: number;
    URL : string ;
    Tags : string ;

}