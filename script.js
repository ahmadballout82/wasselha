// =========================================================
// وصّلها
// script.js
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

  // =======================================================
  // العناصر
  // =======================================================

  const header =
    document.getElementById("header")

  const menuButton =
    document.getElementById("menuButton")

  const mainNav =
    document.getElementById("mainNav")

  const navLinks =
    document.querySelectorAll(".nav-link")

  const backToTop =
    document.getElementById("backToTop")

  const orderForm =
    document.getElementById("orderForm")

  const orderMessage =
    document.getElementById("orderMessage")

  const deliveryDate =
    document.getElementById("deliveryDate")

  const faqItems =
    document.querySelectorAll(".faq-item")

  const sections =
    document.querySelectorAll("main section[id]")


  // =======================================================
  // الهيدر عند التمرير
  // =======================================================

  function updateHeader() {

    if (!header) {
      return
    }

    if (window.scrollY > 30) {

      header.classList.add("scrolled")

    } else {

      header.classList.remove("scrolled")

    }

  }


  updateHeader()


  window.addEventListener(
    "scroll",
    updateHeader
  )


  // =======================================================
  // القائمة على الهاتف
  // =======================================================

  function openMenu() {

    if (!menuButton || !mainNav) {
      return
    }

    mainNav.classList.add("active")

    menuButton.classList.add("active")

    document.body.classList.add("menu-open")

    menuButton.setAttribute(
      "aria-expanded",
      "true"
    )

  }


  function closeMenu() {

    if (!menuButton || !mainNav) {
      return
    }

    mainNav.classList.remove("active")

    menuButton.classList.remove("active")

    document.body.classList.remove("menu-open")

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    )

  }


  function toggleMenu() {

    if (!mainNav) {
      return
    }

    const isOpen =
      mainNav.classList.contains("active")

    if (isOpen) {

      closeMenu()

    } else {

      openMenu()

    }

  }


  if (menuButton) {

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    )

    menuButton.addEventListener(
      "click",
      toggleMenu
    )

  }


  navLinks.forEach(function (link) {

    link.addEventListener(
      "click",
      function () {

        closeMenu()

      }
    )

  })


  document.addEventListener(
    "click",
    function (event) {

      if (!mainNav || !menuButton) {
        return
      }

      if (
        !mainNav.classList.contains("active")
      ) {
        return
      }

      const clickedInsideNav =
        mainNav.contains(event.target)

      const clickedMenuButton =
        menuButton.contains(event.target)

      if (
        !clickedInsideNav &&
        !clickedMenuButton
      ) {

        closeMenu()

      }

    }
  )


  document.addEventListener(
    "keydown",
    function (event) {

      if (event.key === "Escape") {

        closeMenu()

      }

    }
  )


  window.addEventListener(
    "resize",
    function () {

      if (window.innerWidth > 900) {

        closeMenu()

      }

    }
  )


  // =======================================================
  // التنقل السلس
  // =======================================================

  const pageLinks =
    document.querySelectorAll('a[href^="#"]')


  pageLinks.forEach(function (link) {

    link.addEventListener(
      "click",
      function (event) {

        const targetId =
          link.getAttribute("href")

        if (
          !targetId ||
          targetId === "#"
        ) {
          return
        }

        const target =
          document.querySelector(targetId)

        if (!target) {
          return
        }

        event.preventDefault()

        const headerHeight =
          header
            ? header.offsetHeight
            : 0

        const targetTop =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerHeight -
          15

        window.scrollTo({

          top: targetTop,

          behavior: "smooth"

        })

      }
    )

  })


  // =======================================================
  // تحديد رابط القسم الحالي
  // =======================================================

  function updateActiveNav() {

    if (!sections.length) {
      return
    }

    const headerHeight =
      header
        ? header.offsetHeight
        : 0

    const scrollPosition =
      window.scrollY +
      headerHeight +
      120

    let currentSection = ""


    sections.forEach(function (section) {

      const sectionTop =
        section.offsetTop

      const sectionHeight =
        section.offsetHeight

      if (
        scrollPosition >= sectionTop &&
        scrollPosition <
        sectionTop + sectionHeight
      ) {

        currentSection =
          section.getAttribute("id")

      }

    })


    navLinks.forEach(function (link) {

      link.classList.remove("active")

      const href =
        link.getAttribute("href")

      if (
        href === "#" + currentSection
      ) {

        link.classList.add("active")

      }

    })

  }


  updateActiveNav()


  window.addEventListener(
    "scroll",
    updateActiveNav
  )


  // =======================================================
  // FAQ
  // =======================================================

  faqItems.forEach(function (item) {

    const question =
      item.querySelector(".faq-question")

    const answer =
      item.querySelector(".faq-answer")

    if (!question || !answer) {
      return
    }


    question.setAttribute(
      "aria-expanded",
      "false"
    )


    question.addEventListener(
      "click",
      function () {

        const isActive =
          item.classList.contains("active")


        faqItems.forEach(function (otherItem) {

          const otherAnswer =
            otherItem.querySelector(".faq-answer")

          const otherQuestion =
            otherItem.querySelector(".faq-question")

          otherItem.classList.remove("active")

          if (otherAnswer) {

            otherAnswer.style.maxHeight =
              null

          }

          if (otherQuestion) {

            otherQuestion.setAttribute(
              "aria-expanded",
              "false"
            )

          }

        })


        if (!isActive) {

          item.classList.add("active")

          answer.style.maxHeight =
            answer.scrollHeight + "px"

          question.setAttribute(
            "aria-expanded",
            "true"
          )

        }

      }
    )

  })


  // =======================================================
  // منع اختيار تاريخ قديم
  // =======================================================

  if (deliveryDate) {

    const today =
      new Date()

    const year =
      today.getFullYear()

    const month =
      String(
        today.getMonth() + 1
      ).padStart(2, "0")

    const day =
      String(
        today.getDate()
      ).padStart(2, "0")

    deliveryDate.min =
      `${year}-${month}-${day}`

  }


  // =======================================================
  // نموذج الطلب
  // =======================================================

  if (orderForm) {

    orderForm.addEventListener(
      "submit",
      function (event) {

        event.preventDefault()


        const customerName =
          document
            .getElementById("customerName")
            ?.value
            .trim()

        const customerPhone =
          document
            .getElementById("customerPhone")
            ?.value
            .trim()

        const deliveryType =
          document
            .getElementById("deliveryType")
            ?.value

        const pickupLocation =
          document
            .getElementById("pickupLocation")
            ?.value
            .trim()

        const deliveryLocation =
          document
            .getElementById("deliveryLocation")
            ?.value
            .trim()

        const selectedDate =
          deliveryDate?.value

        const deliveryTime =
          document
            .getElementById("deliveryTime")
            ?.value

        const orderNotes =
          document
            .getElementById("orderNotes")
            ?.value
            .trim()


        if (
          !customerName ||
          !customerPhone ||
          !deliveryType ||
          !pickupLocation ||
          !deliveryLocation ||
          !selectedDate ||
          !deliveryTime
        ) {

          showOrderMessage(
            "يرجى تعبئة جميع الحقول المطلوبة",
            "error"
          )

          return

        }


        const phonePattern =
          /^[0-9+\-\s()]{7,20}$/


        if (
          !phonePattern.test(customerPhone)
        ) {

          showOrderMessage(
            "يرجى إدخال رقم هاتف صحيح",
            "error"
          )

          return

        }


        if (
          pickupLocation.toLowerCase() ===
          deliveryLocation.toLowerCase()
        ) {

          showOrderMessage(
            "موقع الاستلام والتسليم يجب أن يكونا مختلفين",
            "error"
          )

          return

        }


        const selectedDateObject =
          new Date(
            selectedDate + "T00:00:00"
          )

        const today =
          new Date()

        today.setHours(
          0,
          0,
          0,
          0
        )


        if (
          selectedDateObject < today
        ) {

          showOrderMessage(
            "يرجى اختيار تاريخ اليوم أو تاريخ قادم",
            "error"
          )

          return

        }


        const submitButton =
          orderForm.querySelector(
            ".submit-button"
          )


        if (submitButton) {

          submitButton.disabled =
            true

          submitButton.textContent =
            "جارٍ تأكيد الطلب..."

        }


        setTimeout(
          function () {

            showOrderMessage(
              `شكرًا ${customerName}، تم استلام طلب التوصيل التجريبي بنجاح`,
              "success"
            )


            orderForm.reset()


            if (submitButton) {

              submitButton.disabled =
                false

              submitButton.textContent =
                "تأكيد طلب التوصيل"

            }


            if (deliveryDate) {

              const now =
                new Date()

              const year =
                now.getFullYear()

              const month =
                String(
                  now.getMonth() + 1
                ).padStart(2, "0")

              const day =
                String(
                  now.getDate()
                ).padStart(2, "0")

              deliveryDate.min =
                `${year}-${month}-${day}`

            }

          },
          700
        )

      }
    )

  }


  // =======================================================
  // رسالة النموذج
  // =======================================================

  function showOrderMessage(
    message,
    type
  ) {

    if (!orderMessage) {
      return
    }

    orderMessage.textContent =
      message


    if (type === "error") {

      orderMessage.style.color =
        "#d64545"

    } else {

      orderMessage.style.color =
        "#21a366"

    }

  }


  // =======================================================
  // زر العودة للأعلى
  // =======================================================

  function updateBackToTop() {

    if (!backToTop) {
      return
    }

    if (window.scrollY > 500) {

      backToTop.classList.add("show")

    } else {

      backToTop.classList.remove("show")

    }

  }


  updateBackToTop()


  window.addEventListener(
    "scroll",
    updateBackToTop
  )


  if (backToTop) {

    backToTop.addEventListener(
      "click",
      function () {

        window.scrollTo({

          top: 0,

          behavior: "smooth"

        })

      }
    )

  }


  // =======================================================
  // تأثير ظهور العناصر أثناء النزول
  // =======================================================

  const revealElements =
    document.querySelectorAll(
      `
      .service-card,
      .step-card,
      .tracking-feature,
      .why-feature,
      .price-card,
      .review-card,
      .stat-item,
      .faq-item
      `
    )


  revealElements.forEach(
    function (element) {

      element.style.opacity =
        "0"

      element.style.transform =
        "translateY(24px)"

      element.style.transition =
        "opacity 0.6s ease, transform 0.6s ease"

    }
  )


  if (
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        function (
          entries,
          observer
        ) {

          entries.forEach(
            function (entry) {

              if (
                entry.isIntersecting
              ) {

                entry.target.style.opacity =
                  "1"

                entry.target.style.transform =
                  "translateY(0)"

                observer.unobserve(
                  entry.target
                )

              }

            }
          )

        },
        {

          threshold: 0.12

        }
      )


    revealElements.forEach(
      function (element) {

        revealObserver.observe(
          element
        )

      }
    )

  } else {

    revealElements.forEach(
      function (element) {

        element.style.opacity =
          "1"

        element.style.transform =
          "translateY(0)"

      }
    )

  }


  // =======================================================
  // تتبع تجريبي بسيط
  // =======================================================

  const trackingStatusText =
    document.querySelector(
      ".tracking-status-text"
    )

  const trackingSteps =
    document.querySelectorAll(
      ".tracking-feature"
    )


  if (
    trackingStatusText &&
    trackingSteps.length
  ) {

    const statuses = [
      "تم استلام الطلب",
      "المندوب في الطريق",
      "جاري التوصيل",
      "تم التسليم"
    ]

    let currentStatus = 1


    setInterval(
      function () {

        currentStatus++

        if (
          currentStatus >= statuses.length
        ) {

          currentStatus = 0

        }

        trackingStatusText.textContent =
          statuses[currentStatus]

      },
      5000
    )

  }

})