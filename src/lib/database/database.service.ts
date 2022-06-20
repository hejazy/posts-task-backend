import { Injectable } from '@nestjs/common';

import data from './data.json'

@Injectable()
export class DBService {

  async find({collection, search}: {collection: string, search: Record<string, string | number>}): Promise<any> {
    return data[collection]?.filter(item=>{
      for(const key in search){
        if(item[key] !== search[key]) return false;
      }
      return true;
    })
  }

  async findOne({collection, search}: {collection: string, search: Record<string, string | number>}): Promise<any> {
    return data[collection]?.find(item=>{
      for(const key in search)
        if(item[key] !== search[key]) return false;
      return true;
    })
  }

}
