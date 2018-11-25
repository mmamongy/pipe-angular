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
    category: string;
    title: string;
    icon: string;
    brief: number;
}