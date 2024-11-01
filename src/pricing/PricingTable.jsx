import { Table, Text } from '@mantine/core';

import classes from "./PricingTable.module.css"

const reportsTableData = {
    head: ['Výkon', 'Cena'],
    body: [
        ["Pracovně-lékařská prohlídka u registrovaného" ,"600 Kč"],
        ["Vstupní vyšetření do zaměstnání, opakované v daném roce" ,"300 Kč"],
        ["Vyšetření pro řidičský průkaz" ,"600 Kč"],
        ["Vyšetření pro zbrojní průkaz" ,"800 Kč"],
        ["Vyšetření řidiče nad 65 let" ,"400 Kč"],
        ["Vyšetření pro zdravotní průkaz" ,"500 Kč"],
        ["Vyšetření pro studium v zahraničí" ,"600 Kč"],
        ["Vyšetření pro sportovní účely" ,"600 Kč"],
        ["Výpis ze zdravotní dokumentace" ,"400 Kč"],
        ["Vyšetření pro komerční pojišťovny", "dle rozsahu"],
        ["Úrazová pojistka" ,"500 Kč"],
        ["Vyšetření pro studenty UK při zakončení studia" ,"400 Kč"],
        ["Předoperační vyšetření pro výkon nehrazený z veřejného pojištění" ,"600 Kč"],
        ["Administrativní výkony podle rozsahu á 10 min" ,"200 Kč"],
        ["Posudek o zdravotní způsobilosti pro práci s dětm" ,"600 Kč"],
    ],

};

const extraTableData = {
    head: ['Výkon', 'Cena'],
    body: [
        ["ABI - BOSO", "300 Kč"],
        ["Spirometrie" , "300 Kč"],
        ["24-hodinové monitorování TK - Holter", "500 Kč"],
        ["Biolampa / 10 min", "100 Kč"],
        ["Kuřácký balíček  (EKG + ABI BOSO + Oxymetrie + spirometrie)", "900 Kč"],
        ["Psychosomatická konzultace / 50 min"  ,"1 000 Kč"],
        ["Psychosomatická konzultace v angličtině"  , "1 200 Kč"],
    ],

};

const uninsuredTableData = {
    head: ['Výkon', 'Cena'],
    body: [
        ["Cílená konzultace", "400 Kč"],
        ["Celkové vyšetření", "800 Kč"],
        ["EKG vyšetření", "200 Kč"],
        ["Test na okultní krvácení mimo termín", "200 Kč"],
        ["Analýza moči", "100 Kč"],
        ["POCT: INR, CRP", "200 Kč"],
        ["Aplikace injekce i.m. nebo s.c.", "150 Kč"],
        ["Odběr krve", "200 Kč"],
    ],
};

const vaccineTableData = {
    head: ['Výkon', 'Cena'],
    body: [
        ["Adacel / Boostrix", "1 000 Kč"],
        ["Adacel polio", "1 200 Kč"],
        ["Avaxim 160U", "1 450 Kč"],
        ["Engerix- B 20", "1 150 Kč"],
        ["FSME -Immun", "1 000 Kč"],
        ["Gardasil 9", "3 300 Kč"],
        ["MMRVaxpr", "950 Kč"],
        ["Prevenar 13", "1 700 Kč"],
        ["Tetava", "600 Kč"],
        ["Twinrix Adult", "1 980 Kč"],
        ["Typhim Vi", "1 600 Kč"],
    ],
};

export function PricingTable() {
    return(
        <>
        <Text size="xl" className={classes.tableTitle} py="md">Posudky</Text>
        <Table data={reportsTableData} pb="md"/>
        <Text size="xl" className={classes.tableTitle} py="md">Nadstandardní vyžádané výkony neplacené pojišťovnou</Text>
        <Table data={extraTableData} pb="md"/>
        <Text size="xl" className={classes.tableTitle} py="md">Platby u nepojištěných pacientů</Text>
        <Table data={uninsuredTableData} pb="md"/>
        <Text size="xl" className={classes.tableTitle} py="md">Ceník vakcín včetně aplikace</Text>
        <Table data={vaccineTableData} pb="md"/>
        <Text c="dimmed" py="xl" my="xl" ta="center">Všechny ceníky jsou platné od 1.1.2025</Text>
        </>

    )
    
}