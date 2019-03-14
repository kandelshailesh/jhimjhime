function returnnepalinumber(strNum) {
    var arrNumNe = strNum.toString().split('').map(function(ch) {
        if (ch === '.' || ch === ',') {
            return ch;
        }
        return nums1[Number(ch)];
    });
    return arrNumNe.join('');
};

function returnnumber(strNum) {
    var arrNumNe = strNum.toString().split('').map(function(ch) {
        if (ch === '.' || ch === ',') {
            return ch;
        }
        return nums[ch];
    });
    return arrNumNe.join('');
};
