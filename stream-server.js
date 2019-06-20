const express = require('express')
const app = express()

const fs = require('fs')
const path = require('path')

const _isNumber = (text) => {
    const reg = /^\d+$/

    return reg.test(text)
}

const _format = (content) => {
    const blocks = content.split('.')

    return blocks
        .map((block) => {
            return block ? block.trim() : ''
        })
        .map(block => {
            if (_isNumber(block)) return false

            return block
        })
        .filter(Boolean)
        .map(block => {
            const regex = /\,\s\d+/gi

            return block.replace(regex, '')
        })
        .map(block => {
            const regex = /\,\s([A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ])/g

            return block.replace(regex, '.$1')
        })
        .map(block => {
            return block.replace(/\./g, '\n')
        })
        .join('\n')
}

app.get('/tho', (req, res) => {
    const file = path.join(__dirname, 'truyen-kieu.txt')
    const stream = fs.createReadStream(file, {encoding: 'utf8'})

    res.set({'content-type': 'text/plain; charset=utf-8'});
    stream.on('data', (content) => {
        const formatted = _format(content)

        res.write(formatted)
    })

    stream.on('close', () => {
        res.end()
    })
})

app.listen(2000, () => {
    console.log('App is listening on port 2000...')
})