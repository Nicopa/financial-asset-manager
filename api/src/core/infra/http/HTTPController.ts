import { Controller } from "../Controller";
import { HTTPRequest } from "./HTTPRequest";
import { HTTPResponse } from "./HTTPResponse";

export abstract class HTTPController extends Controller<
	HTTPRequest,
	HTTPResponse
> {}
