Vue.component('header-content', {
    template: `
    <header id="headerContent" class="headerContent container-fluid position-fixed bg-white shadow"  style="z-index: 999999999; top: 0; right: 0; left: 0; box-shadow: 0 0 15px #CCC">
            <div class="container">
              <nav class="navbar navbar-expand-lg navbar-light">
                <a class="navbar-brand" href="index.html">
                    <img src="assets/img/tatx-logo.png" width="100" height="100" class="d-inline-block align-top" alt="">
                  Tatx
                </a>
                 <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                   <span class="navbar-toggler-icon"></span>
                 </button>
                 <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                      <li class="nav-item">
                           <a class="nav-link hvr-underline-from-center" href="index.html">Tatx</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link hvr-underline-from-center" href="apps.html">Apps</a>
                   </li>
                      <li class="nav-item">
                        <a class="nav-link hvr-underline-from-center" href="about.html">About</a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link hvr-underline-from-center" href="contact.html.html">Contact</a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link hvr-underline-from-center" href="terms-condition.html">Terms</a>
                     </li>
                    <li class="nav-item">
                        <a class="nav-link hvr-underline-from-center" href="privacy-policy.html">Privacy</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link hvr-underline-from-center" href="team.html">Team</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link hvr-underline-from-center" href="faq.html">FAQ</a>
                    </li>
                      <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <span class="Dropdown-word">Social media </span>
                          <span class="Dropdown-icon"><i class="fas fa-caret-down"></i></span>
                        </a>
                        <div class="dropdown-menu animated slideInUp" aria-labelledby="navbarDropdown">
                          <a class="dropdown-item" href="#"><span class="hvr-forward"><i class="fab fa-facebook-f"></i> Facebook</span> </a>
                          <a class="dropdown-item" href="#"><span class="hvr-forward"><i class="fab fa-twitter"></i> Twitter</span>  </a>
                          <a class="dropdown-item" href="#"><span class="hvr-forward"><i class="fab fa-youtube"></i> YouTube</span> </a>
                        </div>
                      </li>
                    </ul>
                </div>
              </nav>
            </div>
          </header>
    `
})

new Vue({ 
    el: '#app',
    data: {
        lists: ['Ahmed', 'Adel', 'Mohamed']
    }
 })