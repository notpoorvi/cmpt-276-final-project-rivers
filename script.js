let currentTestimonial = 0
const testimonials = [
  '“I never used to cook, but this website makes it so easy to find good recipes!”<br>-- Emily R.', '“It\'s so easy to find new recipes! I\'m cooking new things every week!”<br>-- Chris T.', '“The recipes are so simple to follow! It really is easy as pie!”<br>-- Carly M.'
]

function showNextTestimonial () {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length
  updateTestimonial()
}

function showPreviousTestimonial () {
  currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length
  updateTestimonial()
}

function updateTestimonial () {
  const testimonialElement = document.querySelector('.testimonial')
  testimonialElement.innerHTML = testimonials[currentTestimonial]
}

/* super-linter-disable */
function searchRecipe(event) {
  event.preventDefault()
  const recipeName = document.getElementById('search').value
  window.location.href = 'discovery_page.html?recipe=' + encodeURIComponent(recipeName)
}
/* super-linter-enable */

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('about-us-1').addEventListener('click', function (e) {
    e.preventDefault()
    scrollToSection('about-us')
  })

  document.getElementById('contact-us-1').addEventListener('click', function (e) {
    e.preventDefault()
    scrollToSection('contact-us')
  })
})

function scrollToSection (sectionId) {
  const section = document.getElementById(sectionId)
  window.scrollTo({
    top: section.offsetTop,
    behavior: 'smooth'
  })
  section.classList.add('glow')
  setTimeout(function () {
    section.classList.remove('glow')
  }, 2000)
}
