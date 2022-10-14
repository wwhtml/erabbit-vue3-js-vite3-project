var transform = function (str) {
  return str.replace(/-\w/g, function (x) {
    return x.slice(1).toUpperCase();
  });
};

var transform = function (str) {
  let arr = str.split("-");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].slice(0, 1).toUpperCase() + arr[i].slice(1);
  }
  return arr.join("");
};

let str1 = "xtx-more";
console.log(transform(str1));
