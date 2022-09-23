stop = true;
next_box = 1;

async function setImage() {
	if(!stop){
		let answer = await eel.get_color(stop)();
		
		// hex length
		hex = answer[0];
		if(hex.length != 6){
			hex += '0';
			if(hex.length != 6){
				hex += '0';
			}
		}
		if(hex=='00000'){
			hex = '000000';
		}

		// checking for stopping
		if(answer[1]){
			stop = true;
			document.getElementById('button').innerHTML = 'PICK';

			// adding to list
			document.getElementById('hex-'+next_box).innerHTML = hex;
			document.getElementById('clr-'+next_box).style.background = '#'+hex;
			
			next_box += 1;
			if(next_box == 6){
				next_box = 1;
			}
		}

		// main bar
		document.getElementById('hex').innerHTML = hex;
		document.getElementById('img').style.background = '#'+hex;
	}
}

function pick(){
	if(stop){
		document.getElementById('button').innerHTML = 'PICKING...';
		stop = false;
	}else{
		document.getElementById('button').innerHTML = 'PICK';
		stop = true;
	}
}

function start(){
	setImage();
	setTimeout(start, 200);
}

function clear_list(){
	for(i = 1; i < 6; i++){
		document.getElementById('hex-'+i).innerHTML = '';
		document.getElementById('clr-'+i).style.background = 'none';	
	}
	next_box = 1;
}

start();