import React, {useEffect, useStates} from "react";
import { 
    View, 
    Text, 
    TextInput, 
    Platform, 
    StyleSheet,
    FlatList,
    StatusBar
} from "react-native";
import { Button } from "./components/button";
import { SkillCard } from "./components/SkillCard";

export function Home(){

    const [newSkill, setNewSkill] = useStates();
    const [mySkills, setMySkills] = useStates([]);
    const [greeting, setGreeting] = useStates('');
    
    function handleAddNewSkill(){
        setMySkills(oldState => [...oldState, newSkill]);
    }

    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour < 12){
            setGreeting('good morning');
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting('good afternoon');
        } else {
            setGreeting('good night');
        }
    },[]);

    return(
        <View style={styles.container}>
            {/* <StatusBar barStyle={'light-content'} /> */}
            <Text style={styles.title}>Welcome, Juliano</Text>
            <TextInput 
                style={styles.input}
                placeholder="New Skill"
                placeholderTextColor='#555'
                onChangeText={setNewSkill}
            />

            <Text style={[styles.greetings]}>
                {greeting}
            </Text>

            <Button onPress={handleAddNewSkill} />

            <Text style={[styles.title, {marginVertical: 50}]}>
                My skills
            </Text>

            <FlatList 
                data={mySkills} 
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <SkillCard skill={item} />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        // justifyContent: 'center', 
        // alignItems: 'center' ,
        backgroundColor: '#121015',
        paddingVertical: 70,
        paddingHorizontal: 30,
    },
    title: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#1F1E25',
        color: '#FFF',
        padding: Platform.OS == 'ios' ? 15 : 10,
        fontSize: 18,
        marginTop: 30,
        borderRadius: 7,
    },
    greetings: {
        color: '#FFF',
    }
});
