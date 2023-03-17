const token = localStorage.getItem('token');

window.addEventListener('DOMContentLoaded',()=>{
    axios.get("http://localhost:3000/getReport", {headers:{"Authorization":token}})
    .then(result=>{
        const dailyExpense = document.getElementById('dailyExpense')
        let container = "";
        for(let i =0;i<result.data.length;i++)
        {
            let category = result.data[i].categ;
            let description = result.data[i].des;
            let expense = result.data[i].name;

            container +=`<div> expense:${expense}<==>description:${description}<==>category:${category}</div>`
        }
        dailyExpense.innerHTML = container;
    })

        axios.get("http://localhost:3000/getWeeklyReport", {headers:{"Authorization":token}})
        .then(result=>{
            console.log(result)
            const WeeklyExpense = document.getElementById('weeklyExpense')
            let container = "";
            for(let i =0;i<result.data.length;i++)
            {
                let category = result.data[i].categ;
                let description = result.data[i].des;
                let expense = result.data[i].name;

                container +=`<div> expense:${expense}<==>description:${description}<==>category:${category}<br></div>`


            }
            WeeklyExpense.innerHTML = container;
    })
    .catch(err =>{
        console.log(err)
    })

})