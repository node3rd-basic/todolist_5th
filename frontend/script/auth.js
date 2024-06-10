function getCookieValue(name) {
    const regex = new RegExp(`(^| )${name}=([^;]+)`)
    const match = document.cookie.match(regex)
    if (match) {
        return match[2]
    }
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function logout() {
    setCookie("token", "", 0)
    location.href = "signin.html"
}

async function signInFromRemote(email, password) {
    const response = await fetch("http://localhost:3000/sign-in", {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            email,
            password
        })
    })
    if (response.ok) {
        return response.json()
    } else {
        const error = await response.json()
        throw Error(error.message)
    }
}

async function signUpFromRemote(email, name, password, rePassword, role) {
    if (!email || !name || !password || !rePassword || !role || password !== rePassword) {
        throw Error("잘못된 입력값이 있습니다. 값을 다시한번 확인인 해보세요")
    }
    const response = await fetch("http://localhost:3000/sign-up", {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            email,
            name,
            password,
            rePassword,
            role,
        })
    })
    if (response.ok) {
        return response.json()
    } else {
        const error = await response.json()
        throw Error(error.message)
    }
}

async function getUser() {
    const headers = {
        "authorization": `${getCookieValue("token")}`,
        "Content-Type": "application/json",
    }

    const response = await fetch("http://localhost:3000/users/me", {
        method: "get",
        headers
    })
    if (response.ok) {
        return response.json()
    } else {
        const error = await response.json()
        throw Error(error.message)
    }
}

function auth() {
    const token = getCookieValue("token")
    return {
        token,
        requireLogin: async () => {
            try {
                if (!token) {
                    throw Error("Invalid User")
                }
                const user = await getUser()
                return user
            } catch {
                alert("인증된 사용자가 아닙니다.")
                logout()
                location.href = "signin.html"
            }


        }
    }
}