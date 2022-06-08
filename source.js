
var BingeFlix = (function(){
    var enabled = true;
    var target = {
        childList: true,
        attributes: false,
        subtree: true, //Omit or set to false to observe only changes to the parent node.
      }
    var intro_observer = new MutationObserver(skip_intro)
    var next_observer = new MutationObserver(next_ep)
    function run() {
        try {
            var main = document.querySelector(".watch-video--player-view") || document;
        intro_observer.observe(main,target)
        next_observer.observe(main,target)
        }catch(e) { console.log(e) }
    }
    function skip_intro(mutations, observer) {
        if (!enabled || window.location.href.search("watch") == -1) return;
        let skip = document.querySelector("button[data-uia='player-skip-intro']");
        if (skip) {
            skip.click();
        }
    }
    function next_ep(mutations, observer){
        if(!enabled || window.location.href.search("watch") == -1) return;
        let skip = document.querySelector("button[data-uia='next-episode-seamless-button']");
        if (skip) {
            skip.click();
        }
    }
    function disconnect(){
        intro_observer.disconnect();
        next_observer.disconnect();
    }
    function observe(){
        intro_observer.observe(document.querySelector(".watch-video--player-view") || document,target)
        next_observer.observe(document.querySelector(".watch-video--player-view") || document,target)
    }
    function toggle() {
        if(!enabled) disconnect()
        else observe()
        enabled = !enabled
    }
    return {
        toggle: toggle,
        run: run
    };
})();
// document.addEventListener('DOMContentLoaded', () => BingeFlix.run());
// run when the page is fully loaded
BingeFlix.run();
// BingeFlix.run()
browser.runtime.onMessage.addListener(BingeFlix.toggle)
