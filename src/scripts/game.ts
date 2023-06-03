const fillScreen = (
  {image, situation, environment, goal, answers: {A, B, C, disableButtons}}:
  {image:string, situation: string, environment: string, goal: string, answers: {A: string, B: string, C: string, disableButtons: boolean}}
): void => {
  const illustration = document.querySelector("#illustration") as HTMLElement
  const storyParagraph = document.querySelector("#paragraph") as HTMLElement

  if (image && illustration) illustration.innerHTML = `<img src="${image}" alt="Illustration made by OpenAI"/>`

  if (storyParagraph) {
    storyParagraph.innerHTML = `
        <div>${situation}</div><br>
        <div>${environment}</div><br>
        <div>${goal}</div><br>
      `
  }

  const buttonA = document.querySelector("#answers_buttons>button:nth-child(1)") as HTMLButtonElement
  const buttonB = document.querySelector("#answers_buttons>button:nth-child(2)") as HTMLButtonElement
  const buttonC = document.querySelector("#answers_buttons>button:nth-child(3)") as HTMLButtonElement

  if (buttonA) {
    buttonA.innerHTML = A
    buttonA.disabled = disableButtons
  }

  if (buttonB) {
    buttonB.innerHTML = B
    buttonB.disabled = disableButtons
  }

  if (buttonC) {
    buttonC.innerHTML = C
    buttonC.disabled = disableButtons
  }
}

const setLoading = (): void => {
  fillScreen({
    image: "",
    situation: "<img src='../assets/images/loading.svg' alt='Loading...'/>",
    environment: "",
    goal: "",
    answers: {
      A: "<img src='../assets/images/loading.svg' alt='Loading...'/>",
      B: "<img src='../assets/images/loading.svg' alt='Loading...'/>",
      C: "<img src='../assets/images/loading.svg' alt='Loading...'/>",

      disableButtons: true
    }
  })
}

type StoryResponse = {
  data: (
    {
      image: string
      situation: string
      environment: string
      goal: string
      variants: {
        [key: string]: string
      }
    } |
    {
      message: string
    }
    )
  code: number
}

const nextRound = async (answer = ""): Promise<void> => {
  setLoading()

  const res = (
    answer === ""
    ? await window.API.invoke("new-story", localStorage.getItem("token"))
    : await window.API.invoke("continue-story", {token: localStorage.getItem("token"), answer})
  ) as StoryResponse

  console.log("res", res)

  if (res.code !== 200 || ("message" in res.data)) {
    console.log("error", res)
    alert("Some error happened! Can't connect to server!")
    return
  }

  const {
    situation = "",
    environment = "",
    goal = "",
    variants: {A = "", B = "", C = ""},
    image = ""
  } = res.data

  fillScreen({
    image,
    situation,
    environment,
    goal,
    answers: {
      A,
      B,
      C,

      disableButtons: false
    }
  })
}

window.addEventListener("load", async () => {
  if (!localStorage.getItem("token")) {
    localStorage.clear()
    await window.API.invoke("change-screen", "menu")
  }

  const buttons = Array.from(document.querySelectorAll("#answers_buttons>button")) as HTMLElement[]
  buttons.forEach(button => {
    button.addEventListener("click", async () => {
      const answer = button.innerText ?? ""
      await nextRound(answer)
    })
  })

  const cleanStoryButton = document.querySelector("#clean_story_button") as HTMLButtonElement
  cleanStoryButton.addEventListener("click", async () => {
    const confirmAction = confirm("Do you really want to rewrite the api? All your progress would be lost!")

    if (confirmAction) {
      cleanStoryButton.innerHTML = "<img src='../assets/images/loading.svg' alt='Loading...'/>"

      const res = await window.API.invoke("reset-story", localStorage.getItem("token"))

      if (res?.code === 200) {
        alert("Story was cleared! Generating new adventure...")
        cleanStoryButton.innerHTML = `<i class="fa-solid fa-feather"></i> Rewrite story`
        await nextRound()
      }
      else {
        alert("Can't reset api now! Try do this later.")
        cleanStoryButton.innerHTML = `<i class="fa-solid fa-feather"></i> Rewrite story`
      }
    }
  })

  if (localStorage.getItem("isNewUser") === "true") {
    localStorage.removeItem("isNewUser")
    await nextRound()
  }
  else {
    const lastMessageJSON = localStorage.getItem("lastMessage")

    if (lastMessageJSON) {
      try {
        const {
          image,
          situation,
          environment,
          goal,
          variants: {A = "", B = "", C = ""}
        } = JSON.parse(lastMessageJSON)

        fillScreen({
          image,
          situation,
          environment,
          goal,
          answers: {
            A,
            B,
            C,

            disableButtons: false
          }
        })
      }
      catch (e) {
        console.log("Can't load your previous story", e)
        alert("Error! We cant load your previous story... Please, reset story for more stability!")
      }
    }
  }
})
