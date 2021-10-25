
export const updateObjectInArray = (items: any, itemsId: number, objPropName: string, newObjProps:any) => {
   return items.map(u => {
        if (u[objPropName] === itemsId) {
            return {...u, ...newObjProps}
        }
        return  u
    })
}