const input = document.querySelector('div input');

function visualizeWater() {
    const arr = input.value.split(',').map(Number);
    const result = waterStore(arr);
    const tableContainer = document.getElementById("table-container");
  
    const maxHeight = Math.max(...arr, ...result.soln) + 1;
    const table = document.createElement("table");
  
    for (let row = maxHeight; row >= 1; row--) {
      const tr = document.createElement("tr");
      for (let col = 0; col < arr.length; col++) {
        const td = document.createElement("td");
  
        if (arr[col] >= row) {
          td.className = "block";
        } else if ((arr[col] + result.soln[col]) >= row) {
          td.className = "water";
        } else {
          td.className = "empty";
        }
  
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
  
    tableContainer.appendChild(table);
    document.getElementById('total-water-stored').innerHTML = `Total Water Stored: ${result.totalUnits} Units`;
    input.value = '';
  }
  

function waterStore(arr){
    const soln = new Array(arr.length).fill(0);
    let totalUnits = 0;
    let start = {};
    let end = {};
    for (let i = 0; i < arr.length ;i++){
        if (arr[i] !== 0 && !start.hasOwnProperty('index')){
            start = {index : i, blocks : arr[i]};
        }
        else if(arr[i] !== 0 && start.hasOwnProperty('index')){
            end = {index : i, blocks : arr[i]};
            if(start.blocks < end.blocks){
                for(let j = start.index + 1; j < end.index; j++){
                    soln[j] = start.blocks;
                }
            }
            else{
                for(let j = start.index + 1; j < end.index; j++){
                    soln[j] = end.blocks;
                }
            }
            start = {...end};
            end = {};
        }
    }
    totalUnits = soln.reduce((acc,val) => acc + val ,0);
    console.log(totalUnits,'uu',soln);
    return {soln,totalUnits}; 
}

// console.log(waterStore([0,4,0,0,0,6,0,6,4,0]));
