/**
 * 수학 관련 함수 
 */


/**
 * n 까지의 소수 구하기
 * @param {int} n 
 */
 function chkPrime(n) 
{
	if(n == 1) {return false;};
	for(i=2; i<n; i++) {	if(n%i == 0){return false}};
	return true;
};

/**
 * 
 * @param v 퍼센트 대상 값 
 * @param t 전체 값
 */
function getPercent(v,t)
{
    if(v)
    {
        return (v/t)*100;
    }else{
        return 0;
    }
};
/**
 * 
 * @param {number} per 
 * @param {number} total 
 */
/**
전체 값에서 퍼센트에 해당하는 값을 뺀 값
*/
function getDepercentRemain(per,total)
{
	return t-((p/100)*t);
};

/**
퍼센트에 해당하는 값11
*/
function getDepercent(p,t){	return (p/100)*t;};

/**
전체 값
*/
function getTotalPercent(p,v){	return (v/p)*100;};

/**
* 랜덤 / 참고 : http://blog.naver.com/hika00?Redirect=Log&logNo=150025341786
*/
function GetRandom(b,t)
{
	arr = new Array();
	k = Math.floor(Math.random()*10)%3;
	arr[0] =  b+Math.random()*(t+1-b);
	arr[1] =  b+Math.random()*(t+1-b);
	arr[2] =  b+Math.random()*(t+1-b);
	return arr[k];
};

/**
* http://kr.php.net/manual/kr/function.log.php
*/
function byteConvert(b)
{
	s = new Array('B', 'Kb', 'MB', 'GB', 'TB', 'PB');
	e = Math.floor(Math.log(b)/Math.log(1024));
	r = b/Math.pow(1024, Math.floor(e));
	return r+s[e];
};

/**
* 소수점 자리수(l)까지 절삭
*/
function cutFloor(f,l)
{
	if(typeof(l) == "undefined"){l=3};
	l = Math.pow(10,l);
	f = Math.floor(f*l)/l;
	return f;
};
/**
* 반올림후 자리수(l)까지 절삭
*/
function cutRound(f,l)
{
	if(typeof(l) == "undefined"){l=3}
	l = Math.pow(10,l);
	f = Math.round(f*l)/l;
	return f;
};



