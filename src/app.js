function Calculation () {

    this.selectClasses = (classSelector ,type) => Array.from(document.querySelectorAll(classSelector)).map(e => {
        return type === 'num' ? +e.value : e.value;
    });    
   
    this.info = () => { 
        [
            names,
            amountOfPeople,
            tariffs,
            billUsage,
            meters,
        ] = [
            ['.family-names', 'str'],
            ['.amount-of-people', 'num'],
            ['.prices', 'num'],
            ['.usage-amount', 'num'],
            ['.meters input', 'num'],
        
        ].map((c) => this.selectClasses(c[0],`${ c[1] === 'num' ? 'num':'str'}`));
        
        usage = meters.map((a,i,t) => i%2 !==0 ? a-(t[i-1]): null).filter(n => n !== null);
        // calculate usage of  main consumer & add to array
        usage.unshift(billUsage.reduce((a,v) => a+v, 0) - usage.reduce((a,v) => a+v, 0));  
        
        return ({
            names,
            amountOfPeople,
            tariffs,
            billUsage,
            usage,
            meters
        });
    }
    
    this.result = () => {
        const allowedAmountForPerson = this.info().billUsage[0] / this.info().amountOfPeople.reduce((a,v) => a+v, 0);

        // TODO: handle use-case when 1 or more tenants have used *less* then allowed.
        const allowedForEachTenant = this.info().amountOfPeople.map(t => t * allowedAmountForPerson);
        

        const tariff1ToPay = allowedForEachTenant.map(a => a * this.info().tariffs[0]);
        const tariff2ToPay = this.info().usage.map((p, i) => (p - allowedForEachTenant[i]) * this.info().tariffs[1])
        const totalToPay = tariff1ToPay.map((t, i) => t+ tariff2ToPay[i]);

        return ({
            allowedForEachTenant,
            tariff1ToPay,
            tariff2ToPay,
            totalToPay
        })
    }

    // this.validate = (checkValidation) => {

    // }
}


function calculate() {
    const calculation = new Calculation();
    let table = document.querySelector('table');
    html = '';
    console.log(calculation.info())
    console.log(calculation.result())
    calculation.info().names.forEach((n, i) => html += `
        <tr>
            <td rowspan="2">${n}</td>
            <td>תעריף 1</td>
            <td>${calculation.result().allowedForEachTenant[i].toFixed(2)} מ"ק</td>
            <td rowspan="2">${calculation.result().totalToPay[i].toFixed(2)} ‎₪</td>
        </tr>
        <tr>
            <td>תעריף 2</td>
            <td>${(calculation.info().usage[i] - calculation.result().allowedForEachTenant[i]).toFixed(2)} מ"ק</td> 
        </tr>`
    );

    table.innerHTML += html;
}

const validateSteps = (button) => {
    // const buttonParentElement = document.querySelector(button).parentElement;
    // const onvalidInputs = buttonParentElement
    console.log('fdhs')
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


