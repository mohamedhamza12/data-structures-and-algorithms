const mergeTwoHalves = (arr, start, end, mid) => {
    let start1 = start, start2 = mid + 1;
    let temp = [];

    while (start1 <= mid && start2 <= end) {
        if (arr[start1] < arr[start2]) {
            temp.push(arr[start1]);
            start1++;
        } else {
            temp.push(arr[start2]);
            start2++;
        }
    }

    while (start1 <= mid) {
        temp.push(arr[start1]);
        start1++;
    }

    while (start2 <= end) {
        temp.push(arr[start2]);
        start2++;
    }

    for (let i = start; i <= end; i++)
        arr[i] = temp[i - start];
}

const mergeSort = (arr, start, end) => {
    if (start >= end)
        return;
    const mid = Math.floor((end - start) / 2 + start);
    mergeSort(arr, start, mid);
    mergeSort(arr, mid + 1, end);
    mergeTwoHalves(arr, start, end, mid);
}