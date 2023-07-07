export default function ItemNotInList(sub: any, arr: any) {
    return arr.filter((a: any) => !sub.includes(a));
}
