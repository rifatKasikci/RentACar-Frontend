import { Car } from "./carDetail";
import { ResponseModel } from "./responseModel";

export interface CarResponseModel extends ResponseModel{
    data:Car[]
}