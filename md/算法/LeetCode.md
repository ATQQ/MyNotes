# 1. 两数之和
* 暴力解法
  ```js
  var twoSum = function (nums, target) {
            for(var i=0;i<nums.length;i++){
                for(var j=i+1;j<nums.length;j++){
                    if(nums[i]+nums[j]===target){
                        return [i,j];
                    }
                }
            }
        };
  ```
* 两遍哈希表
  ```js
        var twoSum = function (nums, target) {
            var $map=new Map();
            nums.forEach((v,i)=>{
                $map.set(v,i);
            })

            for(let i=0;i<nums.length;i++){
                if($map.has(target-nums[i])&& $map.get(target - nums[i])!==i){
                    return [i, $map.get(target - nums[i])]
                }
            }
        };
  ```
* 一遍哈希表
  ```js
          var twoSum = function (nums, target) {
            var $map=new Map();
            for(let i=0;i<nums.length;i++){
                var com=target-nums[i];
                if($map.has(com)){
                    return [$map.get(com),i];
                }
                $map.set(nums[i],i);
            }
        };
  ```
  ```java
  public int[] twoSum(int[] nums, int target) {
        HashMap<Integer,Integer> map=new HashMap<>();
            for(int i=0;i<nums.length;i++){
                int res=target-nums[i];
                if(map.containsKey(res)){
                    return new int[]{map.get(res),i};
                }
                map.put(nums[i],i);
            }
            throw new IllegalArgumentException("No result");
    }
  ```
