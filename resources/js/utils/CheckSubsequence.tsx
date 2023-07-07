export function checkSubsequence(sub: any, arr: any) {
    let subIdx = 0;
    sub.sort();
    arr.sort();
    for (let i = 0; i < arr.length; i++) {
        if (sub[subIdx] == arr[i]) {
            subIdx++;
        }
        if (subIdx == sub.length) {
            return true;
        }
    }
    return false;
}
