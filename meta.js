<script>

    mymap.userWalletAddress = null
    const loginButton =  document.getElementById('loginButton')
    const userWallet =  document.getElementById('userWallet')

    function toggleButton(){
        if (!window.ethereum) {
            loginButton.innerText = ' Metamask is not installed'
            loginButton.classList.remove('bg-purple-500', 'text-white')
            loginButton.classList.add('bg-gray-500', 'text-gray-300', 'cursor-not-allowed')
            return false
        }

        loginButton.addEventListener('click', loginWithMetamask)  
    }

    async function loginWithMetamask(){
     const accounts = await  ethereum.request({ method: 'eth_requestAccounts' })
        .catch((e) => {
           console.error(e.message)
           return 
        })
        if(!accounts){
            return
        }
        window.userWalletAddress = accounts[0]
        userWallet.innerText = window.userWalletAddress
    }

    window.addEventListener('DOMContentLoaded', (event) => {
        toggleButton();
    });

    // document.on('ready', () => {
    //     alert('Jambo');
    // });
</script>