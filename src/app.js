function Calculation () {

    this.selectClasses = (classSelector ,type) => Array.from(document.querySelectorAll(classSelector)).map(e => {
        return type === 'num' ? +e.value : e.value;
    });    
   
    this.info = () => {
        [
            this.names,
            this.amountOfPeople,
            this.tariffs,
            this.billUsage,
            this.meters,
        ] = [
            ['.family-names', 'str'],
            ['.amount-of-people', 'num'],
            ['.prices', 'num'],
            ['.usage-amount', 'num'],
            ['.meters input', 'num'],
    
        ].map((c) => this.selectClasses(c[0],`${ c[1] === 'num' ? 'num':'str'}`));

        this.usage = this.meters.map((a,i,t) => i%2 !==0 ? a-(t[i-1]): null).filter(n => n !== null);
        this.usage.unshift(this.billUsage.reduce((a,v) => a+v, 0) - this.usage.reduce((a,v) => a+v, 0));

        return ({
            names: this.names,
            amountOfPeople: this.amountOfPeople,
            tariffs: this.tariffs,
            billUsage: this.billUsage,
            usage: this.usage,
            meters: this.meters
        });
    }


    this.result = () => {
        
        const allowedAmountForPerson = this.info().billUsage[0] / this.info().amountOfPeople.reduce((a,v) => a+v, 0);
        const allowedForEachTenant = this.info().amountOfPeople.map(t => t * allowedAmountForPerson);
        

        const tariff1ToPay = allowedForEachTenant.map(a => a * this.info().tariffs[0]);
        const tariff2ToPay = this.usage.map((p, i) => (p - allowedForEachTenant[i]) * this.tariffs[1])
        const totalToPay = tariff1ToPay.map((t, i) => t+ tariff2ToPay[i]);
        console.log(tariff2ToPay)
        console.log(this.usage)
        return (
            {
                tariff1ToPay,
                tariff2ToPay,
                totalToPay,
                allowedForEachTenant
            }
        )
        
        // allowedForEachTenant.map(a => a * this.info().tariffs[1]); 
        console.log('allowedForEachTenant:' ,allowedForEachTenant)
        console.log('tariff1ToPay:', tariff1ToPay)
        console.log('tariff2ToPay', tariff2ToPay)

    }
}


function testa() {
    const test = new Calculation();
    console.log(test.info())
    console.log(test.result())
    let table = document.querySelector('table');
    html = '';
    test.names.forEach((n, i) => html += `
        <tr>
            <td rowspan="2">${n}</td>
            <td>תעריף 1</td>
            <td>${test.result().allowedForEachTenant[i].toFixed(2)} מ"ק</td>
            <td rowspan="2">${test.result().totalToPay[i].toFixed(2)} ‎₪</td>
        </tr>
        <tr>
            <td>תעריף 2</td>
            <td>${(test.usage[i] - test.result().allowedForEachTenant[i]).toFixed(2)} מ"ק</td> 
        </tr>`
    );

    table.innerHTML += html;
}


const addConsumer = () => {
    document.querySelectorAll('.add-button, .remove-button').forEach(btn => btn.remove())
    document.querySelector('.secondary-consumers').innerHTML += `
        <div class="consumer">
            <div class="input-container">
                <input class="family-names" type="text"  placeholder="שם" value="">
                <input class="amount-of-people" type="number"  placeholder="נפשות" value="">
            </div>
            <div class="input-container meters">
                <input type="number"  placeholder="קריאת מונה קודמת" value="">
                <input type="number"  placeholder="קריאת מונה נוכחית" value="">
            </div>
        </div>    
    `
    document.querySelector('.add-remove-buttons').innerHTML += `
        <button type="button" class="add-button" onclick="addConsumer()">+</button>
        <button type="button" class="remove-button" onclick="removeConsumer()">-</button>
    `
}


const removeConsumer = () => document.querySelector('.secondary-consumers').lastElementChild.remove();


