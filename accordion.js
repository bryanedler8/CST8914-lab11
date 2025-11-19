//pseudocode
/*
  1.Grab the accordion buttons from the DOM
  2. go through each accordion button one by one
  3. Use the classlist dom method in combination with the toggle method provided by the DOM to add or remove the "is-open" class. At this point, the accordion button should be able to switch back and forth between its font awesome icons but there is no content inside of it. This is because of the overflow:hidden and the max-height of zero; it is hiding our content. So now we must use javascript to change these values with DOM CSS
  4. get the div that has the content of the accordion button you are currently looking at; we do this using the .nextElementSibling method which allows us to look at the html element that is directly next to the current html element we are looking at. Since we are currently looking at a button (accordion button), the next element after that is the div with the class accordion-content. This is exactly what we want because it allows us to work with the div that has the content that we want to display. Also please note that we could have got to this div in another way but this is the "shortest path" to our answer.
  
  5. set the max-height based on whether the current value of the max-height css property. If the max-height is currently 0 (if the page has just been visited for the first time) or null (if it has been toggled once already) which means that it is closed, you will give it an actual value so the content will be shown; if not then that means the max-height currently has a value and you can set it back to null to close it.
  6. If the accordion is closed we set the max-height of the currently hidden text inside the accordion from 0 to the scroll height of the content inside the accordion. The scroll height refers to the height of an html element in pixels. For this specific example, we are talking about the height of the div with the class accordion-content with all of its nested ptags
*/

//  Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  const accordionBtns = document.querySelectorAll(".accordion");

  // Function to toggle accordion
  function toggleAccordion(button) {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    const newState = !isExpanded;
    
    // Update button state
    button.setAttribute('aria-expanded', newState.toString());
    
    // Get the content panel
    const content = document.getElementById(button.getAttribute('aria-controls'));
    
    if (content) {
      if (newState) {
        // Expand the content
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        // Collapse the content
        content.style.maxHeight = "0";
      }
    }
  }
  
  // Set up click events
  accordionBtns.forEach((accordion) => {
    accordion.addEventListener('click', function() {
      toggleAccordion(this);
    });
    
    // Set up keyboard events
    accordion.addEventListener('keydown', function(e) {
      // Space or Enter key toggles the accordion
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggleAccordion(this);
      }
      
      // Home key goes to first accordion
      if (e.key === 'Home') {
        e.preventDefault();
        accordionBtns[0].focus();
      }
      
      // End key goes to last accordion
      if (e.key === 'End') {
        e.preventDefault();
        accordionBtns[accordionBtns.length - 1].focus();
      }
      
      // Up/Down arrow keys navigate between accordions
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = this.parentElement.previousElementSibling;
        if (prev) {
          const prevButton = prev.querySelector('.accordion');
          if (prevButton) prevButton.focus();
        }
      }
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = this.parentElement.nextElementSibling;
        if (next) {
          const nextButton = next.querySelector('.accordion');
          if (nextButton) nextButton.focus();
        }
      }
    });
  });
});