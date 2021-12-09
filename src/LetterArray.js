//Function to return the alphabet and the color white for the font color

function LetterArray() {  
    const alphabet =['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    return (alphabet.map(letter => [letter, 'white']));
}
export default LetterArray