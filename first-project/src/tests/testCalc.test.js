import { mount } from '@vue/test-utils'
import Calc from "../components/Calc.vue"


describe('Test Calculator', () => {  //тестируем ввод первого числа
    it('test first operand input', () => {
        const wrapper = mount(Calc)
        const operand1 = wrapper.find('input[name=operand1]')
        operand1.setValue('1')
        expect(wrapper.vm.operand1).toBe(1)
    })

    it('test second operand input', () => {  //тестируем ввод второго числа
        const wrapper = mount(Calc)
        const operand2 = wrapper.find('input[name=operand2]')
        operand2.element.value = "1"
        operand2.trigger('input')
        expect(wrapper.vm.operand2).toBe(1)
    })

    it('test sum', () => {   //тестируем суммирование 
        const wrapper = mount(Calc)
        const operand1 = wrapper.find('input[name=operand1]')
        operand1.setValue('3')
        const operand2 = wrapper.find('input[name=operand2]')
        operand2.setValue('2')
        const sumBtn = wrapper.find('button[name="+"]')
        sumBtn.trigger('click')
        expect(wrapper.vm.result).toBe(5)
    })

    it('test sub', () => { //тестируем вычитание
        const wrapper = mount(Calc)
        const operand1 = wrapper.find('input[name=operand1]')
        operand1.setValue('10')
        const operand2 = wrapper.find('input[name=operand2]')
        operand2.setValue('5')
        const sumBtn = wrapper.find('button[name="-"]')
        sumBtn.trigger('click')
        expect(wrapper.vm.result).toBe(5)
    })

    it('test division', () => { //тестируем деление
        const wrapper = mount(Calc)
        const operand1 = wrapper.find('input[name=operand1]')
        operand1.setValue('100')
        const operand2 = wrapper.find('input[name=operand2]')
        operand2.setValue('10')
        const divBtn = wrapper.find('button[name="/"]')
        divBtn.trigger('click')
        expect(wrapper.vm.result).toBe(10)
    })

    it('test multiplication', () => { //тестируем умножение
        const wrapper = mount(Calc)
        const operand1 = wrapper.find('input[name=operand1]')
        operand1.setValue('5')
        const operand2 = wrapper.find('input[name=operand2]')
        operand2.setValue('3')
        const mulBtn = wrapper.find('button[name="*"]')
        mulBtn.trigger('click')
        expect(wrapper.vm.result).toBe(15)
    })

    it('test degree', () => { //тестируем возведение в степень
        const wrapper = mount(Calc)
        const operand1 = wrapper.find('input[name=operand1]')
        operand1.setValue('2')
        const operand2 = wrapper.find('input[name=operand2]')
        operand2.setValue('2')
        const degBtn = wrapper.find('button[name="Возвести в степень"]')
        degBtn.trigger('click')
        expect(wrapper.vm.result).toBe(4)
    })

    it('test integerDivision', () => { //целочисленное деление
        const wrapper = mount(Calc)
        const operand1 = wrapper.find('input[name=operand1]')
        operand1.setValue('5')
        const operand2 = wrapper.find('input[name=operand2]')
        operand2.setValue('3')
        const intBtn = wrapper.find('button[name="Целочисленное деление"]')
        intBtn.trigger('click')
        expect(wrapper.vm.result).toBe(1)
    })


    it('test Del number', () => {  //тестируем удаление последнего символа 
        const wrapper = mount(Calc)
        const operand1 = wrapper.find('input[name=operand1]')
        operand1.setValue('34')
        const delBtn = wrapper.find('button[name="Del"]')
        delBtn.trigger('click')
        expect(wrapper.vm.operand1).toBe(3)
    })

    it('test keyboard', async () => {  //тестируем отображение экранной клавиатуры
        const wrapper = mount(Calc)
        const keyBtn = wrapper.find('input[name=keyboard]')
        await keyBtn.trigger('click')
        expect(wrapper.vm.checked).toBe(true)
    })

})