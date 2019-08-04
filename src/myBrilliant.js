const usedLessThanAllowed = (used, allowed, people) => {
    const usedLess = used.map((u,i) => u < allowed[i] ? u : undefined);  //  hold track of trh indeexes indicies
    const leftOvers = usedLess.map((u,i) => u !== undefined ? allowed[i] - u : undefined)
                              .filter(e => e)
                              .reduce((a,v) => a+v, 0);

    const amountOfPeopleUsedMore = usedLess.map((u, i) => u !== undefined ? undefined : people[i])
                                           .filter(e => e)  // filter out undefined values
                                           .reduce((a,v) => a+v, 0);

    const addToEveryOne = leftOvers / amountOfPeopleUsedMore;
    const newAllowed = used.map((u, i) => {
        if (usedLess[i] === undefined) {
            console.log(allowed[i], (addToEveryOne * people[i]))
            return allowed[i] + (addToEveryOne * people[i]);
        } else {
            return used[i];
        }
    });

    return newAllowed;
}
// ulman - 3 35 , berger 5, 10, gros 2 ,5
// 8 people used more, / 12 lefoOer = 1.5  // *3 = 4.5, *5 = 7.5
// [0] = 14.5, [1]= 20.5
console.log(usedLessThanAllowed([20, 15, 5], [10, 13, 17], [3, 5, 2]));  

