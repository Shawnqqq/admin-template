import request from "@/global/request/axios";
import API from "@/global/request/api";

const basicService = {
  example(params) {
    return request.get(API.example, params);
  }
};

export default basicService;
