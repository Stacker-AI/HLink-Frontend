import { ListboxModule } from 'primeng/listbox';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Todo } from './todo';
import { todoService } from '../../service/todo.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ElementRef } from '@angular/core';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CheckboxChangeEvent } from 'primeng/checkbox';


//table-responvie-scroll
interface expandedRows {
    [key: string]: boolean;
}


@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    // breadcrumb code

    items: MenuItem[] | undefined;

    home: MenuItem | undefined;


    //line chart

    data: any;

    options: any;

    //dougnut chart
    datas: any;

    optionss: any;


    //table-respnvie-scroll



    //table-responvie-scroll
    customers1: Customer[] = [];

    customers2: Customer[] = [];

    customers3: Customer[] = [];

    selectedCustomers1: Customer[] = [];

    selectedCustomer: Customer = {};

    representatives: Representative[] = [];

    statuses: any[] = [];

    products: Product[] = [];

    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;


    chartData: any;

    chartOptions: any;

    subscription!: Subscription;


    // todo list

    @ViewChild('todoTask') todoTask: any;

    task = '';
    todos: Todo[] = [];

    getList() {
        this.todoService.getTodoList().subscribe(
            response => {
                this.todos = response;
            }
        )
    }

    updateTodo(e: CheckboxChangeEvent, todo: Todo) {
        this.todoService.updateTodo({ ...todo, completed: e.checked }).subscribe(
            response => console.log(response)
        )
    }

    deleteTodo(e: unknown, id: Todo['id']) {
        this.todoService.deleteTodo(id).subscribe(
            response => this.getList()
        )
    }

    addTodo() {
        this.todoService.addTodo({ task: this.task, completed: false }).subscribe(
            response => {
                this.todoTask.reset();
                this.getList();
            }
        )
    }


    // vertical bar chart
    barData: any;
    barOptions: any;



    constructor(private productService: ProductService, public layoutService: LayoutService, private customerService: CustomerService, private todoService: todoService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(config => {
            this.initCharts();
        });

    }


    ngOnInit() {

        //   breadcrumb code

        this.items = [{ label: 'Computer' }, { label: 'Notebook' }, { label: 'Accessories' }, { label: 'Backpacks' }, { label: 'Item' }];

        this.home = { icon: 'pi pi-home', routerLink: '/' };

        //line chart
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.data = {
            labels: ['00:00', '2:00', '03:00', '04:00', '05:00', '06:00', '07:00'],
            datasets: [
                {
                    label: 'New Patients',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                },
                {
                    label: 'Old Patients',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    tension: 0.4
                }
            ]
        };

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };



        // dougnut chart
        const documentsStyle = getComputedStyle(document.documentElement);
        const textsColor = documentsStyle.getPropertyValue('--text-color');

        this.datas = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [documentsStyle.getPropertyValue('--blue-500'), documentsStyle.getPropertyValue('--yellow-500'), documentsStyle.getPropertyValue('--green-500')],
                    hoverBackgroundColor: [documentsStyle.getPropertyValue('--blue-400'), documentsStyle.getPropertyValue('--yellow-400'), documentsStyle.getPropertyValue('--green-400')]
                }
            ]
        };


        this.optionss = {
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: textsColor
                    }
                }
            }
        };


        // table-responvie-scroll
        this.customerService.getCustomersLarge().then(customers => {
            this.customers1 = customers;
            this.loading = false;

            // @ts-ignore
            this.customers1.forEach(customer => customer.date = new Date(customer.date));
        });
        this.customerService.getCustomersMedium().then(customers => this.customers2 = customers);
        this.customerService.getCustomersLarge().then(customers => this.customers3 = customers);
        this.productService.getProductsWithOrdersSmall().then(data => this.products = data);

        this.representatives = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png' },
            { name: 'XuXue Feng', image: 'xuxuefeng.png' }
        ];

        this.statuses = [
            { label: 'Typhod', value: 'typhod' },
            { label: 'Cholera', value: 'cholera' },
            { label: 'Infection', value: 'infection' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Fever', value: 'fever' },
            { label: 'Maleria', value: 'maleria' },
            { label: 'Jaundice', value: 'jaundice' }
        ];


        //vertical bar chart
        this.initCharts();
    }

    onSort() {
        this.updateRowGroupMetaData();
    }

    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};

        if (this.customers3) {
            for (let i = 0; i < this.customers3.length; i++) {
                const rowData = this.customers3[i];
                const representativeName = rowData?.representative?.name || '';

                if (i === 0) {
                    this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
                }
                else {
                    const previousRowData = this.customers3[i - 1];
                    const previousRowGroup = previousRowData?.representative?.name;
                    if (representativeName === previousRowGroup) {
                        this.rowGroupMetadata[representativeName].size++;
                    }
                    else {
                        this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
                    }
                }
            }
        }
    }

    expandAll() {
        if (!this.isExpanded) {
            this.products.forEach(product => product && product.name ? this.expandedRows[product.name] = true : '');

        } else {
            this.expandedRows = {};
        }
        this.isExpanded = !this.isExpanded;
    }

    formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }









    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }


    //vertica bar cahrt
    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.barData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                    borderColor: documentStyle.getPropertyValue('--primary-200'),
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };

        this.barOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };
    }




}



