export const findSearch = (search:string) =>{
    const result = {
        floor:'',
        region: ''
    }
    const floor  = search.match(/[&?]floor=([^&]+)/)
    const region  = search.match(/[&?]region=([^&]+)/)
    result.floor = floor ?  floor[1] : '1'
    result.region = region ? region[1] : ''
    return result
}
