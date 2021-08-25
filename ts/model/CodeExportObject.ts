export default class CodeExportObject {
    code: string
    language: string
    filename: string

    constructor(code: string,
        language: string,
        filename: string) {
        this.language=language
        this.filename=filename
        this.code=code    

    }

}