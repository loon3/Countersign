var bitcore = require('bitcore');

$( document ).ready(function() {
    
    $('html, body').css({
    'overflow': 'hidden',
    'height': '100%'
    });

    $("#showresult").hide();
    		
    		 var qtHdr = [
      			"-----BEGIN BITCOIN SIGNED MESSAGE-----",
      			"-----BEGIN BITCOIN SIGNATURE-----",
      			"-----END BITCOIN SIGNATURE-----"
    			];

    		function makedSignedMessage(msg, addr, sig)
    		{
        		return qtHdr[0]+'\n'+msg +'\n'+qtHdr[1]+'\nVersion: Bitcoin-qt (1.0)\nAddress: '+addr+'\n\n'+sig+'\n'+qtHdr[2];
    		}
    		
    		function getprivkey(inputaddr){
    			//var inputaddr = $('#inputaddress').val();
    			
    			var string = $('#inputpassphrase').val().trim().toLowerCase();
                string = string.replace(/\s{2,}/g, ' ');
                var array = string.split(" ");
                
                m2 = new Mnemonic(array);
                
                var HDPrivateKey = bitcore.HDPrivateKey.fromSeed(m2.toHex(), bitcore.Networks.livenet);
                
                 
                        for (var i = 0; i < 50; i++) {
                            
                            var derived = HDPrivateKey.derive("m/0'/0/" + i);
                            var address1 = new bitcore.Address(derived.publicKey, bitcore.Networks.livenet);
                           
                            var pubkey = address1.toString();
                            
                            if (inputaddr == pubkey) {
                            var privkey = derived.privateKey.toWIF();
                            break;
                            
                            }
                        }
                
                return privkey;
    		}
    		
    		
    		
    		function signwith(privkey, pubkey, message) {
    			
    			
    			
    			//var message = "Message, message";
      			var p = updateAddr(privkey, pubkey);
      			
      			if ( !message || !p.address ){
        		return;
      			}

      			message = fullTrim(message);

      			
        		var sig = sign_message(p.key, message, p.compressed, p.addrtype);
   

      			sgData = {"message":message, "address":p.address, "signature":sig};

      			signature_final = makedSignedMessage(sgData.message, sgData.address, sgData.signature);
    			
    			return signature_final;
    
    		}
    		
         
        	$("#signmessagebutton").click(function() {
			  	var inputaddr = $('#inputaddress').val();
			  	var message = $('#inputmessage').val();
			  	
			  	var privkey = getprivkey(inputaddr);
			  	
			  	var signature = signwith(privkey, inputaddr, message);
			  	
			  	$("#returnsig").html("<pre>" + signature + "</pre>")
			  	
			  	$("#inputinfo").hide();
			  	$("#showresult").show();
			  	
			}); 
    
    
            $("#resetbutton").click(function() {
              	
                $("#inputinfo").find("input:text").val("");   
                $("#inputinfo").show();
			  	$("#showresult").hide();
			  	
			}); 
         
         
    
    
});