const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [{
        id: 1,
        text: '"Relizer : Pengulangan "\n \n Text-Adventure Games',
        options: [{
                text: 'Mulai',
                nextText: 2
            },
            {
                text: 'Tentang',
                nextText: 50
            }
        ]
    },
    {
        id: 2,
        text: 'Perlahan mataku mulai terbuka, kulihat atap ruangan yang berwana putih dan kain gorden yang mengelilingiku. Aku sadar bawahwa aku sekarang berada diruang uks. Namun aku masih tidak ingat apa yang terjadi . saat aku hendak berdiri meninggalkan ruangan ini, tiba – tiba secarik kertas jatuh dari kantong celanaku .',
        options: [{
                text: 'Aku mengambil kertas tersebut ',
                nextText: 3
            },
            {
                text: 'Karna terlihat lusuh, kebiarkan kertas itu dan pergi meninggalkan ruangan ini. ',
                nextText: 4
            }
        ]
    },
    {
        id: 3,
        text: 'Ketika kubuka , hanya ada terdapat angka bertuliskan 1709, aku tak tau apa yang dimaksut aku pun menyimpanya dan meninggalkan ruangan.',
        options: [{
            text: '..................',
            setState: { kertas: true },
            nextText: 4
        }]
    },
    {
        id: 4,
        text: '“Hei…….. Kemana saja kau ?” teriak seseorang yang berlari kearahku. Dia berlari sambil senyam-senyum seperti anak kecil yang baru mendapatkan hadiah ulang tahun.  Namanya adalah rey, dia sedikit terkenal karena sifatnya yang playboy \n “Kawan, coba tebak apa yang baru aku dapatkan ? “.',
        options: [{
                text: '“Kau baru saja mendapatkan pinjaman uang ?” ',
                nextText: 5
            },
            {
                text: '“Kau mendapatkan gadis lain yang dapat kau permainkan ?” ',
                nextText: 5
            },
            {
                text: '“Dari pada itu, kau tau ini kertas apa ? ” ',
                requiredState: (currentState) => currentState.kertas,
                nextText: 5
            }
        ]
    },
    {
        id: 5,
        text: '“Ayolah siapa peduli dengan itu  !!!“  \n “Lau apa yang kau dapatkan ?” tanyaku balik padanya. \n “Aku baru saja mendaptkan surat cinta dari elina. kau tau kan elina gadis tercantik paling populer yang ada disekolah ini “ ',
        options: [{
            text: 'Restart',
            nextText: -1
        }]
    },
    {
        id: 6,
        text: 'You wake up well rested and full of energy ready to explore the nearby castle.',
        options: [{
            text: 'Explore the castle',
            nextText: 7
        }]
    },
    {
        id: 7,
        text: 'While exploring the castle you come across a horrible monster in your path.',
        options: [{
                text: 'Try to run',
                nextText: 8
            },
            {
                text: 'Attack it with your sword',
                requiredState: (currentState) => currentState.sword,
                nextText: 9
            },
            {
                text: 'Hide behind your shield',
                requiredState: (currentState) => currentState.shield,
                nextText: 10
            },
            {
                text: 'Throw the blue goo at it',
                requiredState: (currentState) => currentState.blueGoo,
                nextText: 11
            }
        ]
    },
    {
        id: 8,
        text: 'Your attempts to run are in vain and the monster easily catches.',
        options: [{
            text: 'Restart',
            nextText: -1
        }]
    },
    {
        id: 9,
        text: 'You foolishly thought this monster could be slain with a single sword.',
        options: [{
            text: 'Restart',
            nextText: -1
        }]
    },
    {
        id: 10,
        text: 'The monster laughed as you hid behind your shield and ate you.',
        options: [{
            text: 'Restart',
            nextText: -1
        }]
    },
    {
        id: 11,
        text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.',
        options: [{
            text: 'Congratulations. Play Again.',
            nextText: -1
        }]
    },
    {
        id: 50,
        text: 'Games ini dibuat untuk memenuhi matakuliah analisis dan desain algoritma \n Dibuat oleh : M. Aris Firmansyah, Bustomi Ardiansyah',
        options: [{
            text: 'Kembali',
            nextText: -1
        }]
    }
]

startGame()