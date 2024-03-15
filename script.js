///*
var snum, sopr, sacl;
var l_eqn, s_opr = "^/*+-";

function ini()
{
	snum = "", sopr = "", sacl = "", l_eqn = [];
	for (var i = 2; i >= 0; i--)
	{
		for (var j = 1; j <= 3; j++)
		{
			snum += `<button id="b${i*3+j}" onclick="clicked('${i*3+j}')">${i*3+j}</button>${ ((i*3+j)%3) ? "" : "<br>" }`;
		}
	}
	snum += `<button id="b0" onclick="clicked('0')">0</button><button id="bdot" onclick="clicked('.')">.</button><button id="beql" onclick="clicked('=')">=</button>`;
	sopr += `<button id="bdiv" onclick="clicked('/')">/</button><br><button id="bmlt" onclick="clicked('*')">*</button><br><button id="bsub" onclick="clicked('-')">-</button><br><button id="badd" onclick="clicked('+')">+</button>`;
	sacl += `<button id="bobk" onclick="clicked('(')">(</button><button id="bcbk" onclick="clicked(')')">)</button><button id="bdel" onclick="clicked('<')"><</button><button id="bacl" onclick="clicked('ac')">AC</button><br>`;
	document.getElementById("num").innerHTML = snum;
	document.getElementById("opr").innerHTML = sopr;
	document.getElementById("acl").innerHTML = sacl;
	document.getElementById("res").innerText = "> ";
}

function solver(l_eqn)
{
	var x;
	for (var i = 0; i < l_eqn.length; i++)
	{
		if (l_eqn[i] === "(")
		{
			console.log(l_eqn[i]);
			x = 1;
			for (var j = i+1; j < l_eqn.length; j++)
			{
				if (l_eqn[j] === "(")
				{
					console.log(2);
					x++;
				}
				else if (l_eqn[j] === ")")
				{
					console.log(3);
					x--;
					if (x === 0)
					{
						console.log(4);
						let ini_len = l_eqn.length;
						l_eqn = l_eqn.slice(0, i).concat(solver(l_eqn.slice(i+1, j))).concat(l_eqn.slice(j+1, l_eqn.length));
						console.log(1, l_eqn.slice(0, i), l_eqn.slice(i+1, j), l_eqn.slice(j+1, l_eqn.length));
						i -= ini_len-l_eqn.length;
						break;
					}
				}
				if (x < 0)
				{
					raiseError("Parenthesis");
					return;
				}
			}
		}
	}
	l_num = l_eqn.filter(x => !isNaN(x)).map(x => Number(x));
	l_opr = l_eqn.filter(x => isNaN(x)).map(x => x);
	console.log("ini", l_num, l_opr);

	for (var j = 0; j < s_opr.length; j++)
	{
		for (var i = 0; i <= l_opr.length; i++)
		{
			if (l_opr[i] === s_opr[j])
			{
				if (s_opr[j] === "^")
					l_num[i] = l_num[i]**l_num[i+1];
				else if (s_opr[j] === "/")
					l_num[i] = l_num[i]/l_num[i+1];
				else if (s_opr[j] === "*")
					l_num[i] = l_num[i]*l_num[i+1];
				else if (s_opr[j] === "-")
					l_num[i] = l_num[i]-l_num[i+1];
				else
					l_num[i] = l_num[i]+l_num[i+1];
				l_opr[i] = l_num[i+1] = "";
				l_num = l_num.filter(x => x);
				l_opr = l_opr.filter(x => x);
				i--;
			}
		}		
	}
	console.log(l_num[0]);
	return (l_num[0] ? l_num[0] : 0);

}

function clicked(s)
{	
	if (s === "ac")
	{
		l_eqn = [];
		document.getElementById("res").innerText = "> ";
		return;
	}
	
	else if (s === "<")
	{
		if (l_eqn.length)
		{
			l_eqn[l_eqn.length-1] = l_eqn[l_eqn.length-1].slice(0, -1);
			if (! l_eqn[l_eqn.length-1])
			{
				l_eqn.pop();
			}
			document.getElementById("res").innerText = "> "+l_eqn.join("");
			console.log(l_eqn);
		}
		return;
	}

	else if (!isNaN(Number(s)) || (s === "."))
	{
		if (l_eqn && (!isNaN(l_eqn[l_eqn.length-1]) || l_eqn[l_eqn.length-1] === "."))
		{
			l_eqn[l_eqn.length-1] += s;
		}
		else
		{
			l_eqn.push(s);
		}
		console.log(l_eqn);
	}
	
	else if (s === "=")
	{
		l_eqn = [String(solver(l_eqn))];
		document.getElementById("res").innerText = "> " + (l_num[0] ? l_num[0] : 0);
		return;
	}
	else
	{
		l_eqn.push(s);
		console.log(l_eqn);
	}
	document.getElementById("res").innerText += s;
}
//*/
