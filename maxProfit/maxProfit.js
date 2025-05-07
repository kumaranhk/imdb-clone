function maxProfit(n) {
    const buildings = [
      { name: 'T', time: 5, rate: 1500 },
      { name: 'P', time: 4, rate: 1000 },
      { name: 'C', time: 10, rate: 3000 }
    ];
  
    const memoizeMap = new Map();
  
    function dfs(timeUsed) {
      if (timeUsed >= n) return { profit: 0, path: [] };
      if (memoizeMap.has(timeUsed)) return memoizeMap.get(timeUsed);
  
      let maxResult = { profit: 0, path: [] };
  
      for (let b of buildings) {
        if (timeUsed + b.time <= n) {
          const buildEndTime = timeUsed + b.time;
          const earningTime = n - buildEndTime;
          const currentProfit = earningTime * b.rate;
  
          const next = dfs(buildEndTime);
          const totalProfit = currentProfit + next.profit;
  
          if (totalProfit > maxResult.profit) {
            maxResult = {
              profit: totalProfit,
              path: [b.name, ...next.path]
            };
          }
        }
      }
  
      memoizeMap.set(timeUsed, maxResult);
      return maxResult;
    }
  
    const result = dfs(0);
  
    // Count buildings
    const count = { T: 0, P: 0, C: 0 };
    for (let b of result.path) {
      count[b]++;
    }
  
    return {
      buildings: `T${count.T} P${count.P} C${count.C}`,
      profit: result.profit
    };
  }
  
    console.log(maxProfit(7));